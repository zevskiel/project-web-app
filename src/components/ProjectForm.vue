<template>
  <div class="project-form">
    <h2 v-if="isEditMode">Edit Project</h2>
    <h2 v-else>Create New Project</h2>
    <form @submit.prevent="saveProject">
      <div>
        <label for="name">Project Name:</label>
        <input type="text" v-model="project.ProjectName" required />
      </div>
      <div>
        <label for="location">Project Location:</label>
        <input type="text" v-model="project.ProjectLocation" required />
      </div>
      <div>
        <label for="stage">Project Stage:</label>
        <input type="text" v-model="project.ProjectStage" required />
      </div>
      <div>
        <label for="startDate">Project Start Date:</label>
        <input type="date" v-model="project.ProjectStartDate" required />
      </div>
      <div>
        <label for="details">Project Details:</label>
        <textarea v-model="project.ProjectDetails" required></textarea>
      </div>
      <div>
        <label for="creatorId">Project Creator ID:</label>
        <input type="text" v-model="project.ProjectCreatorId" required />
      </div>
      <button type="submit">{{ isEditMode ? 'Save Changes' : 'Create Project' }}</button>
      <button v-if="isEditMode" @click.prevent="deleteProject">Delete Project</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: {
        ProjectId: null,
        ProjectName: '',
        ProjectLocation: '',
        ProjectStage: '',
        ProjectStartDate: '',
        ProjectDetails: '',
        ProjectCreatorId: ''
      },
      error: '',
      isEditMode: false
    };
  },
  async created() {
    const projectId = this.$route.params.id;
    if (projectId) {
      try {
        const response = await axios.get('https://localhost:7187/api/Project/${projectId}', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.project = response.data;
        this.isEditMode = true;
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  },
  methods: {
    async saveProject() {
      try {
        if (this.isEditMode) {
          // Update existing project
          await axios.put('http://localhost:8000/projects/${this.project.ProjectId}', this.project, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        } else {
          // Create new project
          await axios.put(`https://localhost:7187/api/Project/${this.project.ProjectId}`, this.project, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        }
        this.$router.push('/projects');
      } catch (error) {
        this.error = 'Error saving project';
        console.error('Error saving project:', error);
      }
    },
    async deleteProject() {
      try {
        await axios.delete('http://localhost:8000/projects/${this.project.ProjectId}', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.$router.push('/projects');
      } catch (error) {
        this.error = 'Error deleting project';
        console.error('Error deleting project:', error);
      }
    }
  }
};
</script>

<style scoped>
.project-form {
  max-width: 600px;
  margin: auto;
}

form div {
  margin-bottom: 1rem;
}

form label {
  display: block;
  margin-bottom: 0.5rem;
}

form input,
form textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  margin-right: 1rem;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #c82333;
}

p {
  color: red;
}
</style>
