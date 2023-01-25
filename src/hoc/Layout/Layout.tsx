import { Grid } from "@mui/material"
import { useEffect } from "react"
import { Tree } from "../../components/Tree/Tree"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchData } from "../../store/actions/tree"

const Layout = () => {
    const { treeData } = useAppSelector((state) => state.tree)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchData(dispatch)
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Tree data={treeData} />
            </Grid>
            <Grid item xs={4}>
                <div>123</div>
            </Grid>
        </Grid>
    )
}

export default Layout
