import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

import { CurrentUser, HashPasswordService, Role } from '@libs/auth';
import { GoogleOauthService } from '@libs/google-oauth';

import { RoleRepository, UserRepository } from '../../user/infrastructure';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly googleOauthService: GoogleOauthService,
    private readonly hashPasswordService: HashPasswordService,
    private readonly jwtService: JwtService,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  private async socialAuth({ googleUser }) {
    if (!googleUser) {
      throw new NotFoundException(`User not found`);
    }

    const { email, firstName, lastName } = googleUser;

    const dbUser = await this.userRepository.findOne({ email });

    if (dbUser) {
      const accessToken = await this.jwtService.signAsync({ userId: dbUser._id });

      return { accessToken };
    }

    const role = await this.roleRepository.findOne({ role: Role.admin });
    const { _id: dbUserId, roles } = await this.userRepository.create({
      email,
      fullName: `${firstName} ${lastName}`,
      roles: [role],
      userName: 'google',
    });

    const accessTokenRoles = roles.map(({ role }) => role);
    const payload: CurrentUser = { roles: accessTokenRoles, userId: dbUserId };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  @Get('/google')
  public async googleAuth(@Res({ passthrough: true }) res: Response) {
    const url = this.googleOauthService.getAuthUrl();

    res.redirect(url);
  }

  @Get('/google-redirect')
  public async googleAuthRedirect(
    @Req() req: Request<Record<string, never>, Record<string, never>, Record<string, never>, { code: string }>,
  ) {
    const googleQueryCode = req.query.code;

    const googleUser = await this.googleOauthService.getUser(googleQueryCode);

    const { accessToken } = await this.socialAuth({ googleUser });

    return { data: { accessToken } };
  }

  @Post('/sign-in')
  public async signIn(@Body() { email, password }) {
    const findedUser = await this.userRepository.findOne({ email });

    if (!findedUser) {
      throw new BadRequestException('User not found');
    }

    const isCompare = await this.hashPasswordService.compare(password, findedUser.password);

    if (!isCompare) {
      throw new BadRequestException('password not match');
    }

    const { _id: userId, roles } = findedUser;
    const accessTokenRoles = roles.map(({ role }) => role);

    const payload: CurrentUser = { roles: accessTokenRoles, userId };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: 99999099 });

    return { data: { accessToken } };
  }

  @Post('/sign-up')
  public async signUp(@Body() { email, fullName, password, userName }) {
    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await this.hashPasswordService.hash(password);

    const role = await this.roleRepository.findOne({ role: Role.user });

    const createdUser = await this.userRepository.create({
      email,
      fullName,
      password: hashedPassword,
      roles: [role],
      userName,
    });

    const { _id: userId, roles } = createdUser;

    const accessTokenRoles = roles.map(({ role }) => role);

    const payload: CurrentUser = { roles: accessTokenRoles, userId };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: 99999099 });

    return { data: { accessToken } };
  }

  @Post('/sign-up-admin')
  public async signUpAdmin(@Body() { email, fullName, password, userName }) {
    const existingUser = await this.userRepository.findOne({ email });

    if (existingUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await this.hashPasswordService.hash(password);

    const role = await this.roleRepository.findOne({ role: Role.admin });

    const createdUser = await this.userRepository.create({
      email,
      fullName,
      password: hashedPassword,
      roles: [role],
      userName,
    });

    const { _id: userId, roles } = createdUser;

    const accessTokenRoles = roles.map(({ role }) => role);

    const payload: CurrentUser = { roles: accessTokenRoles, userId };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: 99999099 });

    return { data: { accessToken } };
  }
}
