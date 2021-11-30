import { validate, ValidationError } from "class-validator";

export default {

    async validateEntity(entity) : Promise<ValidationError[]> {

        const validateOptions = { validationError: { target:false, value:false} };
        const errors          = await validate(entity, validateOptions);

        return errors;
    },
}
