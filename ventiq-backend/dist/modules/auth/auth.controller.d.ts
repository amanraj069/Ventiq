import { AuthService, AuthResponse } from './auth.service';
import { RegisterDto, LoginDto, GoogleVerifyDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<AuthResponse>;
    login(dto: LoginDto): Promise<AuthResponse>;
    verifyGoogle(dto: GoogleVerifyDto): Promise<AuthResponse>;
}
