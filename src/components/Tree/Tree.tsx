import { FC, useState } from "react"
import { TreeNodeProps, TreeProps } from "../../models/models"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import "./Tree.scss"
import { TreeWrapper } from "./TreeWrapper"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import {
    fetchActiveTreeItem,
    fetchDataProperties,
    fetchSelectedTitle,
} from "../../store/actions/tree"

export const Tree: FC<TreeProps> = ({ data }) => {
    return (
        <>
            {data.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </>
    )
}

const TreeNode: FC<TreeNodeProps> = ({ node }) => {
    const dispatch = useAppDispatch()

    const [isVisible, setIsVisible] = useState(false)
    const hasChild = !!node.children

    const handleClick = () => {
        setIsVisible(!isVisible)

        if (!hasChild) {
            dispatch(fetchActiveTreeItem(node.id))

            dispatch(fetchDataProperties(node.properties!))
            dispatch(fetchSelectedTitle(node.name))
        }
    }

    return (
        <ul className="tree-parent">
            <li onClick={handleClick}>
                <div className="tree-name">
                    {hasChild ? (
                        !isVisible ? (
                            <ExpandMoreIcon />
                        ) : (
                            <ExpandLessIcon />
                        )
                    ) : null}

                    <div style={{ marginLeft: 5 }}>{node.name}</div>
                </div>

                <TreeWrapper id={node.id} />
            </li>

            <ul className="tree-child">
                {hasChild && isVisible ? <Tree data={node.children!} /> : null}
            </ul>
        </ul>
    )
}
