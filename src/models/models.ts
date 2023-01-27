export type Action = {
    type: string
    data?: TreeProps | Properties[] | string | Node[]
}

export type Properties = {
    id: string
    title: string
    edit: boolean
    editValue?: string
    content: string[]
}

export type Node = {
    id: string
    name: string
    children?: Node[]
    properties?: Properties[]
}

export interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export interface TreeProps {
    data: Node[]
}

export interface SelectProps {
    list: Properties
    value: string | undefined
}

export interface ListItemProps {
    list: Properties
}

export interface TreeNodeProps {
    node: Node
}
