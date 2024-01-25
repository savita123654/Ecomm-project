import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class utilsService {
    // markAsTouched(group: FormGroup | FormArray) {
    //     group.markAsTouched({ onlySelf: true });

    //     Object.keys(group.controls).map((field) => {
    //         const control = group.get(field);
    //         if (control instanceof FormControl) {
    //             control.markAsTouched({ onlySelf: true });
    //         } else if (control instanceof FormGroup) {
    //             this.markAsTouched(control);
    //         }
    //     });
    // }


    markFormTouched(group: FormGroup | FormArray): void {
        Object.keys(group.controls).forEach((key: string) => {
            const control = group.controls[key];
            if (control instanceof FormGroup || control instanceof FormArray) {
                control.markAsTouched(); this.markFormTouched(control);
            } else {
                control.markAsTouched();
            }
        });
    }
}