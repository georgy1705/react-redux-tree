import { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Properties, SelectProps } from "../../models/models"
import { fetchEditData } from "../../store/actions/tree"
import "./Select.scss"

export const Select: FC<SelectProps> = ({ list, value }) => {
    const dispatch = useAppDispatch()

    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)
    const { activeId } = useAppSelector((state) => state.tree)
    const { treeData } = useAppSelector((state) => state.tree)

    const [selectValue, setSelectValue] = useState<string>(value || "")
    const [selectId, setSelectId] = useState<string>()

    const handleSelectChange = (event: any, id: string) => {
        setSelectValue(event.target.value as string)
        setSelectId(id)
    }

    useEffect(() => {
        dispatch(
            fetchEditData(
                treeProperties,
                selectValue,
                selectId,
                treeData,
                activeId
            )
        )
    }, [selectId, selectValue, activeId, dispatch, treeData, treeProperties])

    return (
        <select
            value={selectValue}
            onChange={(e) => handleSelectChange(e, list.id)}
            name="select"
            className="Select"
        >
            {list.content.map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
}
