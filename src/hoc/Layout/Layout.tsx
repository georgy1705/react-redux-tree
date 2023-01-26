import { Button, Card, Container, Grid } from "@mui/material"
import { useEffect } from "react"
import { Tree } from "../../components/Tree/Tree"
import { TreeCard } from "../../components/TreeCard/TreeCard"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Properties } from "../../models/models"
import { fetchData } from "../../store/actions/tree"
import "./Layout.scss"

const Layout = () => {
    const { treeData } = useAppSelector((state) => state.tree)
    const { treeProperties }: { treeProperties: Properties[] | [] } =
        useAppSelector((state) => state.tree)

    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchData(dispatch)
    }, [])

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
                            <Button
                                onClick={() => {}}
                                variant="contained"
                                color="success"
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
