import { Box, List, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react"
import { useAppSelector } from "../../hooks/hooks"
import { Properties, TabPanelProps } from "../../models/models"
import { ListItem } from "../ListItem/ListItem"

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
    const [value, setValue] = useState(0)

    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
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
                        <List>
                            <ListItem list={item} />
                        </List>
                    </TabPanel>
                )
            })}
        </>
    )
}
