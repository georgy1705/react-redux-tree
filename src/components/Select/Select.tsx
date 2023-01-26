import { MenuItem, SelectChangeEvent } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { Select as SelectInput } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Properties, SelectProps } from "../../models/models"
import { fetchEditData } from "../../store/actions/tree"

export const Select: FC<SelectProps> = ({ list, value }) => {
    const dispatch = useAppDispatch()

    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)

    const [selectValue, setSelectValue] = useState<string>(value || "")
    const [selectId, setSelectId] = useState<string>()

    const handleSelectChange = (event: SelectChangeEvent, id: string) => {
        setSelectValue(event.target.value as string)
        setSelectId(id)
    }

    useEffect(() => {
        dispatch(fetchEditData(treeProperties, selectValue, selectId))
    }, [selectId, selectValue])

    return (
        <SelectInput
            sx={{ width: "30%" }}
            defaultValue={selectValue}
            value={selectValue}
            onChange={(e) => handleSelectChange(e, list.id)}
        >
            {list.content.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </SelectInput>
    )
}
