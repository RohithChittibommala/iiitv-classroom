import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://iiitv-classroom.herokuapp.com",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("classroomToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const api = {
  getAllCourses: () => axiosInstance.get("/course/all"),
  getApprovedCourses: () => axiosInstance.get("/course/approved"),
  getCoursesByInstructor: () =>
    axiosInstance.get("/instructor/courses/approved"),
  getPendingCoursesByInstructor: () =>
    axiosInstance.get("/instructor/courses/pending"),
  getCourseDetailsById: (courseId) =>
    axiosInstance.get(`/course/details/${courseId}`),
  getEnrolledCourses: () => axiosInstance.get("/student/enrolled_courses"),

  verifyUser: (user) => axiosInstance.post("/token/verify", user),

  getAllInstructors: () => axiosInstance.get("/instructor/all"),
  createCourse: (course) =>
    axiosInstance.post("instructor/create_course", course),
  createAnnouncement: (announcement) =>
    axiosInstance.post("/course/create_announcement", announcement),

  deleteAnnouncement: (data) =>
    axiosInstance.post("/course/delete_announcement", data),

  updateProfileImage: (data) => axiosInstance.post("/update_user_image", data),

  createAssignment: (assignment) =>
    axiosInstance.post("/course/create_assignment", assignment),

  enrollInCourse: (courseCode) =>
    axiosInstance.post(`/course/enroll/${courseCode}`),
  register: (data) => axiosInstance.post("/register", data),
  login: (data) => axiosInstance.post("/login", data),

  getUserData: () => axiosInstance.get("/user"),

  approveCourse: (data) => axiosInstance.post("/course/approve", data),
  rejectCourse: (data) => axiosInstance.post("/course/delete", data),

  submitAssignment: (data) => axiosInstance.post("/assignment", data),
  getSubmissions: (assignmentId) =>
    axiosInstance.get(`/assignment/${assignmentId}`),
  updatePasswrord: (data) => axiosInstance.post("/update_password", data),
};

export default api;
