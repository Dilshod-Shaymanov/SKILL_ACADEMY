import { PartialType } from '@nestjs/swagger';
import { CreateCourseMaterialDto } from './create-course_material.dto';

export class UpdateCourseMaterialDto extends PartialType(
  CreateCourseMaterialDto,
) {}
