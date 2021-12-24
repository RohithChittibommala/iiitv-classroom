import axios from "axios";
import { getAccessToken, setAccessToken } from "../token";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await axiosInstance.post("/token/refresh");

      const accessToken = data.accessToken;
      setAccessToken(accessToken);

      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

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

  refershToken: () => axiosInstance.get("/token/refresh"),

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

  resetPassword: (data) => axiosInstance.post("/reset_password", data),

  logout: () => axiosInstance.get("/logout"),

  getUserData: () => axiosInstance.get("/user"),

  forgotPassword: (data) => axiosInstance.post("/forgot_password", data),

  approveCourse: (data) => axiosInstance.post("/course/approve", data),
  rejectCourse: (data) => axiosInstance.post("/course/delete", data),

  submitAssignment: (data) => axiosInstance.post("/assignment", data),
  getSubmissions: (assignmentId) =>
    axiosInstance.get(`/assignment/${assignmentId}`),
  updatePasswrord: (data) => axiosInstance.post("/update_password", data),
};

export default api;
