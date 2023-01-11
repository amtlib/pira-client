import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import { ResourceContext } from "../../contexts/ResourceContext";

const SubtasksWrapper = styled.div`
    margin-top: 12px;
`;

export const Subtasks = ({ subtasks }: { subtasks: { id: string, name: string }[] }) => {
    const { activeProjectId } = useContext(ResourceContext);
    if (!subtasks?.length) {
        return null;
    }
    return (
        <SubtasksWrapper>
            <h2>Subtasks</h2>
            <Grid container>
                {subtasks.map(subtask => (
                    <Grid item xs={12} md={3}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {subtask.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link href={`/project/${activeProjectId}/task/${subtask.id}`}>
                                    <Button size="small">Visit</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </SubtasksWrapper>
    )
}