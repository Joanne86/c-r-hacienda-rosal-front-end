import {ResidentDto} from './ResidentDto.model';

export class RequestDto {
  userDto: ResidentDto;
  message: string;
  response: string;
  type: number;
  publishDate: string;
  state: string;
  id: number;
}
