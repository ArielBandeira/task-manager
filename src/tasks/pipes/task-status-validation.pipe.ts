import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];
    
    
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status); //the index will return -1 if the status does not exist in the array: allowedStatuses

        return idx !== -1;
    }
}