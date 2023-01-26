import { ListItemText, ListItem as Item } from "@mui/material"
import { ListItemProps } from "../../models/models"
import { Select } from "../Select/Select"

export const ListItem = ({ list }: ListItemProps) => {
    if (list.edit) {
        return <Select list={list} value={list.editValue} />
    }

    return (
        <>
            {list.content.map((item: string) => (
                <Item key={item}>
                    <ListItemText primary={item} />
                </Item>
            ))}
        </>
    )
}
