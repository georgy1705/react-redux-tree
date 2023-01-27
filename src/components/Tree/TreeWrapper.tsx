import { useAppSelector } from "../../hooks/hooks"

export const TreeWrapper = ({ id }: { id: string }) => {
    const { activeId } = useAppSelector((state) => state.tree)
    const styles = ["tree-wrapper"]

    if (activeId === id) {
        styles.push("active")
    }

    return <div className={styles.join(" ")}></div>
}
