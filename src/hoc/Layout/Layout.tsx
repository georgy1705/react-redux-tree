import { Button, Card, Container, Grid } from "@mui/material"
import { useEffect } from "react"
import { Tree } from "../../components/Tree/Tree"
import { TreeCard } from "../../components/TreeCard/TreeCard"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Properties, TreeProps } from "../../models/models"
import { fetchData, fetchDataSuccess } from "../../store/actions/tree"
import "./Layout.scss"

const Layout = () => {
    const { treeData } = useAppSelector((state) => state.tree)
    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)

    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchData(dispatch)
    }, [])

    const downloadFile = () => {
        let a = document.createElement("a")
        let file = new Blob([JSON.stringify(treeProperties)], {
            type: "application/json",
        })
        a.href = URL.createObjectURL(file)
        a.download = "file.json"
        a.click()
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }

        const fileReader = new FileReader()
        fileReader.readAsText(e.target.files[0]!, "UTF-8")
        fileReader.onload = (e: any) => {
            const data: TreeProps = JSON.parse(e.target.result)

            dispatch(fetchDataSuccess(data))
        }
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card variant="outlined" style={{ height: "65%", width: "100%" }}>
                <Grid container spacing={2} sx={{ height: "100%" }}>
                    <Grid item xs={3} sx={{ height: "100%" }}>
                        <div className="Tree">
                            <div className="tree-items">
                                <Tree data={treeData} />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <div className="header-card">
                            <Button variant="contained" component="label">
                                Загрузить файл
                                <input
                                    hidden
                                    accept=".json"
                                    type="file"
                                    onChange={handleUpload}
                                />
                            </Button>

                            <Button
                                disabled={treeProperties.length === 0}
                                onClick={downloadFile}
                                variant="contained"
                                color="success"
                                style={{ marginLeft: 10 }}
                            >
                                Скачать файл
                            </Button>
                        </div>

                        <TreeCard />
                    </Grid>
                </Grid>
            </Card>
        </Container>
    )
}

export default Layout
