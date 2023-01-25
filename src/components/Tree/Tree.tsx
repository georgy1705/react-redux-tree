import { FC, useState } from "react"
import { TreeNodeProps, TreeProps } from "../../models/models"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import "./Tree.scss"

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
    const [isVisible, setIsVisible] = useState(false)
    const [active, setActive] = useState(false)
    const hasChild = !!node.children

    const handleExpand = () => {
        setIsVisible(!isVisible)
    }

    return (
        <ul>
            <li
                onClick={handleExpand}
                // className={`${isFolder ? "folder" : "file"}`}
                onMouseOver={() => {
                    setActive(true)
                }}
                onMouseOut={() => {
                    setActive(false)
                }}
            >
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
            </li>

            <ul>
                {hasChild && isVisible ? <Tree data={node.children!} /> : null}
            </ul>
        </ul>
    )
}
