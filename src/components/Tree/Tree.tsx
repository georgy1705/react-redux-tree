import { FC, useState } from "react"
import { TreeNodeProps, TreeProps } from "../../models/models"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import "./Tree.scss"
import { TreeWrapper } from "./TreeWrapper"
import { useAppDispatch } from "../../hooks/hooks"
import { fetchDataProperties } from "../../store/actions/tree"

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
            dispatch(fetchDataProperties(node.properties!))
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

                <TreeWrapper />
            </li>

            <ul className="tree-child">
                {hasChild && isVisible ? <Tree data={node.children!} /> : null}
            </ul>
        </ul>
    )
}
