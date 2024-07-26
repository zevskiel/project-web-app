<template>
  <div class="project-list">
    <h2>Projects</h2>
    <table>
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Project Location</th>
          <th>Project Stage</th>
          <th>Project Category</th>
          <th>Project Start Date</th>
          <th>Project Details</th>
          <th>Project Creator ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.ProjectId">
          <td>{{ project.ProjectId }}</td>
          <td>{{ project.ProjectName }}</td>
          <td>{{ project.ProjectLocation }}</td>
          <td>{{ project.ProjectStage }}</td>
          <td>{{ project.ProjectCategory }}</td>
          <td>{{ project.ProjectStartDate }}</td>
          <td>{{ project.ProjectDetails }}</td>
          <td>{{ project.ProjectCreatorId }}</td>
          <td>
            <button @click="editProject(project.ProjectId)">Edit</button>
            <button @click="deleteProject(project.ProjectId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        projects: []
      };
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:8000/projects', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    methods: {
      editProject(id) {
        const project = this.projects.find(project => project.ProjectId === id);
        this.$router.push({
          path: `/dashboard/projects/${id}/edit`,
          state: {projectData: project}
        });
      },
      async deleteProject(id) {
        try {
          await axios.delete(`https://localhost:7187/api/Project/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.projects = this.projects.filter(project => project.ProjectId !== id);
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      }
    }
  };
  </script>