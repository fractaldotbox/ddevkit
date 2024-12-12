/*
* Baes on shadcn & react-hook-form for file upload
*/

import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Input } from "./ui/input";

export const FileInputField = ({ field, isMultipleFiles, isAcceptDirectory }: { field: ControllerRenderProps<FieldValues, string>, isMultipleFiles?: boolean, isAcceptDirectory?: boolean }) => {
    const inputFileProps = {
        multiple: isMultipleFiles
    }
    if (isAcceptDirectory) {
        //@ts-ignore
        inputFileProps.webkitdirectory = "true";
    }

    return (
        <Input
            id="file"
            type="file"
            {...field}
            {...inputFileProps}
            value={field?.value?.fileName}
            onChange={(event) => {
                const files = event?.target?.files;
                const file = isMultipleFiles ? files : files?.[0];
                field.onChange(file);
            }}
        />
    );
};