import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

export type TCustomProps = {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
};
export const TextFieldCustom = forwardRef<HTMLInputElement, TCustomProps>(({ onChange, ...other }, ref) => {
	return (
		<IMaskInput
			{...other}
			mask="00:00"
			definitions={{
				"#": /[0-9]/,
			}}
			inputRef={ref}
			onAccept={(value: string) => onChange({ target: { name: other.name, value } })}
			overwrite
		/>
	);
});
