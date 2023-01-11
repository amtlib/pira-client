import { Button } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import { ResourceContext } from "../../contexts/ResourceContext";

export const BackButton = () => {
    const { activeProjectId } = useContext(ResourceContext);
    return (
        <Link href={`/project/${activeProjectId}`}>
            <Button variant="contained" color="default">
                Back to project
            </Button>
        </Link>
    )
}