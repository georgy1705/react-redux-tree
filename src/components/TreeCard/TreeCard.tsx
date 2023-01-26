import {
    Box,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tab,
    Tabs,
    Typography,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Properties, TabPanelProps } from "../../models/models"
import { fetchEditData } from "../../store/actions/tree"

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    }
}

export const TreeCard = () => {
    const dispatch = useAppDispatch()

    const [value, setValue] = useState(0)

    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)

    const [selectValue, setSelectValue] = useState<string>()
    const [selectId, setSelectId] = useState<string>()

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const handleSelectChange = (event: SelectChangeEvent, id: string) => {
        setSelectValue(event.target.value as string)
        setSelectId(id)
    }

    useEffect(() => {
        dispatch(fetchEditData(treeProperties, selectValue, selectId))
    }, [selectId, selectValue])

    const renderListItem = (list: Properties) => {
        if (list.edit) {
            return (
                <Select
                    value={selectValue}
                    defaultValue={list.editValue}
                    onChange={(e) => handleSelectChange(e, list.id)}
                >
                    {list.content.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            )
        }

        return list.content.map((item: string) => (
            <ListItem key={item}>
                <ListItemText primary={item} />
            </ListItem>
        ))
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Свойства машин"
                >
                    {treeProperties?.map((item) => (
                        <Tab
                            key={item.id}
                            label={item.title}
                            {...a11yProps(Number(item.id))}
                        />
                    ))}
                </Tabs>
            </Box>

            {treeProperties?.map((item) => {
                return (
                    <TabPanel
                        key={item.id}
                        value={value}
                        index={Number(item.id)}
                    >
                        <List>{renderListItem(item)}</List>
                    </TabPanel>
                )
            })}
        </>
    )
}
