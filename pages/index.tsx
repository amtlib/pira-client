import { gql, useQuery } from "@apollo/client";
import React, { useContext, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";
import { LinearProgress } from "@material-ui/core";
import { NoProjects } from "../components/ProjectCard/NoProjects";
import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import { BasicLayout } from "../layouts/BasicLayout";
import { LogInToSeeProjects } from "../components/ProjectCard/LogInToSeeProjects";

const USER_PROJECTS = gql`
 query USER_PROJECTS($userId: ID) {
    assigneeUsers(where: {user: {id: {equals: $userId}}}) {
      project {
        id
        title
        tasksCount
        description
      }
      role
    }
 }
`;

export default function Home() {
  const { userId } = useContext(UserContext);
  const { data, loading } = useQuery(USER_PROJECTS, { variables: userId });

  const projects = useMemo(() => {
    return data?.assigneeUsers?.map(assignee => ({
      project: { ...assignee.project },
      role: assignee.role
    })) || []
  }, [data]);

  return (
    <BasicLayout page={projects ? "projects" : "index"}>
      {loading && <LinearProgress />}
      <div style={{ width: "100%", }}>
        {userId ? (<>{
          projects ? projects.map(project => (
            <ProjectCard project={project.project} key={project.project.id} />
          )) : (
            <NoProjects />
          )}</>) : (
            <LogInToSeeProjects />
        )}

      </div>
    </BasicLayout>
  );
}