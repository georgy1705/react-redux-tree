export type Action = {
    type: string
    data?: any
}

type Node = {
    id: string
    name: string
    expanded: boolean
    children?: Node[]
}

export interface TreeProps {
    data: Node[]
}

export interface TreeNodeProps {
    node: Node
}
