import { v4 as uuidv4 } from 'uuid';

export class UUIDService {
  public static generate() {
    return uuidv4();
  }  
}