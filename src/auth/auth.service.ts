import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.inteface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}


    async signUp(authCredentiaslDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentiaslDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise< { accessToken: string } > {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }


        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);


        return { accessToken };
    }
}
