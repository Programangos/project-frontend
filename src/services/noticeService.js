import apiClient from './apiClient';

export const noticeService = {
  getNotices(params = {}) {
    return apiClient.get('/notices/', { params });
  },

  createNotice(data) {
    return apiClient.post('/notices/', data);
  },

  likeNotice(noticeId, userId) {
    return apiClient.post(`/notices/${noticeId}/like/`, { user_id: userId });
  },

  unlikeNotice(noticeId, userId) {
    return apiClient.delete(`/notices/${noticeId}/like/`, { params: { user_id: userId } });
  },

  deleteNotice(noticeId, userId) {
    return apiClient.delete(`/notices/${noticeId}/`, { data: { user_id: userId } });
  },

  reportNotice(noticeId, userId, reason) {
    return apiClient.post(`/notices/${noticeId}/report/`, {
      user_id: userId,
      reason,
      content_type: 'notice',
      reference_id: noticeId,
    });
  }
};
