import { IsEnum, IsNotEmpty } from 'class-validator';

export class SetRoleDto {
  @IsEnum(['founder', 'investor'])
  @IsNotEmpty()
  role: 'founder' | 'investor';
}
