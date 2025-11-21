export type LoginBodyType = {
  email?: string;
  password?: string;
};

export type forgotPasswordBodyType = {
  onSuccess?(): unknown;
  email?: string;
};

export type verifyOTPBodyType = {
  email?: string;
  token: string;
};

export type resendOtpBodyType = {
  email?: string;
  otp_type?: string;
};

export type SignupBodyType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
};

export type VerifyAccountBodyType = {
  email: string;
  otp: number | string;
  otp_type?: string;
};

export type ResetPasswordBodyType = {
  email: string;
  password: string;
};
export type AccountDeleteBodyType = {
  status: string;
};
export type ChangePasswordBodyType = {
  old_password: string;
  password: string;
};

export type UpdateProfileBodyType = {
  first_name?: string;
  last_name?: string;
  profile_image_id?: string;
};

export type EmojiTemplateHistoryQuery = {
  search?: string;
  page?: number;
  per_page?: number;
  sort_direction?: 'ASC' | 'DESC';
};

export type ChatInitTypes = {
  prompt: any;
  color_grading: any;
  aspect_ratio: any;
  emoji_type: any[];
};

export type StaticChatDataTypes = {
  prompt: string;
  base_image_url: string;
};
