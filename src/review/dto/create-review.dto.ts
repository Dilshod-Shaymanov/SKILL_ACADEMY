import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: '5',
    description: 'Rating for the review (1 to 5)',
  })
  @IsNotEmpty({ message: 'Rating should not be empty' })
  @IsString({ message: 'Rating must be a string' })
  rating: string;

  @ApiProperty({
    example: 'Great product!',
    description: 'Comment about the product',
  })
  @IsNotEmpty({ message: 'Comment should not be empty' })
  @IsString({ message: 'Comment must be a string' })
  comment: string;

  @ApiProperty({
    example: 10,
    description: 'Number of likes the review received',
  })
  @IsNotEmpty({ message: 'Likes should not be empty' })
  @IsNumber({}, { message: 'Likes must be a number' })
  likes: number;

  @ApiProperty({
    example: '2',
    description: 'Count of helpful votes',
  })
  @IsNotEmpty({ message: 'Helpful count should not be empty' })
  @IsString({ message: 'Helpful count must be a string' })
  helpfull_count: string;

  @ApiProperty({
    example: '1',
    description: 'Count of reports',
  })
  @IsNotEmpty({ message: 'Report count should not be empty' })
  @IsString({ message: 'Report count must be a string' })
  report_count: string;
}
