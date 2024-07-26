<template>
  <div v-if="isLoggedIn" class="project-form">
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
        <select v-model="project.ProjectStage" required>
          <option value="">Select Stage</option>
          <option value="Concept">Concept</option>
          <option value="Design & Documentation">Design & Documentation</option>
          <option value="Pre-Construction">Pre-Construction</option>
          <option value="Construction">Construction</option>
        </select>
      </div>
      <div>
        <label for="category">Project Category:</label>
        <select v-model="project.ProjectCategory" required>
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" v-if="project.ProjectCategory === 'Other'" v-model="project.OtherCategory" placeholder="Enter Category" />
      </div>
      <div>
        <label for="startDate">Project Start Date:</label>
        <input type="datetime-local" v-model="project.ProjectStartDate" required />
      </div>
      <div>
        <label for="details">Project Details:</label>
        <textarea v-model="project.ProjectDetails" required></textarea>
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
        ProjectId: 0,
        ProjectName: '',
        ProjectLocation: '',
        ProjectStage: '',
        ProjectStartDate: '',
        ProjectDetails: '',
        ProjectCreatorId: ''
      },
      error: '',
      isEditMode: false,
      isLoggedIn: sessionStorage.getItem('userId') !== null && sessionStorage.getItem('userId') !== ''
    };
  },
  async created() {
    const projectId = this.$route.params.id;
    if (projectId) {
      try {
        const response = await axios.get(`https://localhost:7187/api/project/${projectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        //handle camel case
        this.project.ProjectId = response.data.projectId;
        this.project.ProjectName = response.data.projectName;
        this.project.ProjectLocation = response.data.projectLocation;
        this.project.ProjectStage = response.data.projectStage;
        this.project.ProjectStartDate = new Date(response.data.projectStartDate).toISOString().slice(0, 16);
        this.project.ProjectDetails = response.data.projectDetails;
        this.project.ProjectCreatorId = response.data.projectCreatorId;
        this.project.ProjectCategory = response.data.projectCategory;
        this.isEditMode = true;
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }
  },
  methods: {
    async saveProject() {
      try {
        //set user ID
        this.project.ProjectCreatorId = sessionStorage.getItem('userId');
        
        //set project category
        if (this.project.ProjectCategory === 'Other') {
          this.project.ProjectCategory = this.project.OtherCategory;
        }
        if (this.isEditMode) {
          // Update existing project
          await axios.put(`https://localhost:7187/api/Project/${this.project.ProjectId}`, this.project, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        } else {
          // Create new project          
          await axios.post('https://localhost:7187/api/Project', this.project, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        }
        this.$router.push('/dashboard/projects');
      } catch (error) {
        this.error = 'Error saving project';
        console.error('Error saving project:', error);
      }
    },
    async deleteProject() {
      try {
        await axios.delete(`http://localhost:7187/api/Project/${this.project.ProjectId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        this.$router.push('/dashboard/projects');
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
