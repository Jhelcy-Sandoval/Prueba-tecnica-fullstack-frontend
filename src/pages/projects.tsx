import DefaultLayout from "../layout/default"

interface ProjectsPageProps {
  mode: boolean;
}

export function ProjectsPage ({mode}: ProjectsPageProps) {

  return(
    <>
      <DefaultLayout mode={mode}>
        hola a projects
      </DefaultLayout>
    </>
  )
}
