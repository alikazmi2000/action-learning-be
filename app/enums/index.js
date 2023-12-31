
const Status = Object.freeze({
  Active: 'active',//vendor,worker 4
  Sent: 'sent', //manager
  Received: 'received',
  Pending: 'pending',//customer
  Completed: 'completed',//worker 7
  Finished: 'finished',//manager 9
  InProgress: 'in_progress',//worker 6
  inReview: 'in_review',//manager ,2
  Accepted: 'accepted',//worker
  Rejected: 'rejected',//manager
  Blocked: 'blocked',
  Cancelled: 'cancelled',
  Confirmed: 'confirmed',//manager 5
  InActive: 'inactive',
  New: 'new',//1
  Archived: 'archived',
  Paid: 'paid',//manager 8
  NotPaid: 'not_paid',//manager
  Scheduled: 'scheduled'//manager 3
});

const Category = Object.freeze({
  Plumbing:'plumbing',
  Carpenting:'carpenting',
  Flooring:'flooring',
})

const Roles = Object.freeze({
  SuperAdmin: 'super_admin',
  Admin: 'admin',
  Worker: 'worker',
  Vendor: 'vendor',
  Customer: 'customer',
  Manager: 'manager',
});

const NotificationTypes = Object.freeze({
  Update: 'update',
  Appointment: 'appointment',
  Job: 'project',
  Message: 'message',
  Milestone: 'milestone'
});

const ReviewTypes = Object.freeze({
  Quality: 'quality',
  Payment: 'payment'
});

const QuestionTypes = Object.freeze({
  Text: 'text',
  Sliding: 'slider',
  File: 'file',
  FileDoc: 'file_doc'
});

const StripeBankAccountHolderType = Object.freeze({
  Individual: 'individual',
  Business: 'business'
});

const DeviceTypes = Object.freeze({
  Web: 'web',
  Android: 'android',
  IOS: 'ios'
});

const CreditCardTypes = Object.freeze({
  Amex: 'amex',
  Diners: 'diners',
  Discover: 'discover',
  JCB: 'jcb',
  MasterCard: 'mastercard',
  UnionPay: 'unionpay',
  Visa: 'visa'
});

const UploadTypes = Object.freeze({
  User: 'user',
  Job: 'job',
  Category: 'category'
});

const JobTypes = Object.freeze({
  Hourly: 'hourly',
  Fixed: 'fixed'
});

const ScheduleTypes = Object.freeze({
  SMS: 'sms',
  Phone: 'phone'
});

const Ratings = [1, 2, 3, 4, 5];

const ErrorCodes = Object.freeze({
  INTERNAL_SERVER_ERROR: { httpStatus: 500, code: 0, message: 'ERROR.INTERNAL_SERVER_ERROR' },
  NOT_FOUND: { httpStatus: 404, code: 1, message: 'ERROR.NOT_FOUND' },
  BAD_REQUEST: { httpStatus: 400, code: 2, message: 'ERROR.BAD_REQUEST' },
  ID_MALFORMED: { httpStatus: 400, code: 2, message: 'ERROR.ID_MALFORMED_GENERAL' },
  UNAUTHORIZED: { httpStatus: 401, code: 3, message: 'ERROR.UNAUTHORIZED' },
  INVALID_REQUEST: { httpStatus: 400, code: 4, message: 'ERROR.INVALID_REQUEST' },
  ENDPOINT_NOT_FOUND: { httpStatus: 404, code: 5, message: 'ERROR.ENDPOINT_NOT_FOUND' },
  METHOD_NOT_ALLOWED: { httpStatus: 405, code: 6, message: 'ERROR.METHOD_NOT_ALLOWED' },
  TOO_MANY_REQUESTS: { httpStatus: 429, code: 7, message: 'ERROR.TOO_MANY_REQUESTS' },
  FORBIDDEN: { httpStatus: 403, code: 10, message: 'ERROR.FORBIDDEN' },
  FAILED_TO_CONNECT_TO_THE_DATABASE: {
    httpStatus: 500,
    code: 11,
    message: 'ERROR.FAILED_TO_CONNECT_TO_THE_DATABASE'
  },
  UNPROCESSABLE_ENTITY: { httpStatus: 422, code: 12, message: 'ERROR.UNPROCESSABLE_ENTITY' },
  INVALID_OR_EMPTY_PAYLOAD: {
    httpStatus: 400,
    code: 13,
    message: 'ERROR.INVALID_OR_EMPTY_PAYLOAD'
  },
  API_IS_CURRENTLY_UNDER_MAINTENANCE: {
    httpStatus: 503,
    code: 21,
    message: 'ERROR.API_IS_CURRENTLY_UNDER_MAINTENANCE'
  },
  INVALID_CACHE_CONFIGURATION: {
    httpStatus: 503,
    code: 23,
    message: 'ERROR.INVALID_CACHE_CONFIGURATION'
  },
  INVALID_CREDENTIALS: { httpStatus: 404, code: 100, message: 'ERROR.INVALID_CREDENTIALS' },
  INVALID_TOKEN: { httpStatus: 401, code: 101, message: 'ERROR.INVALID_TOKEN' },
  EXPIRED_TOKEN: { httpStatus: 401, code: 102, message: 'ERROR.EXPIRED_TOKEN' },
  INACTIVE_USER: { httpStatus: 401, code: 103, message: 'ERROR.INACTIVE_USER' },
  USER_NOT_FOUND: { httpStatus: 404, code: 106, message: 'ERROR.USER_NOT_FOUND' },
  INVALID_REQUEST_TOKEN: { httpStatus: 401, code: 109, message: 'ERROR.INVALID_REQUEST_TOKEN' },
  EXPIRED_REQUEST_TOKEN: { httpStatus: 401, code: 110, message: 'ERROR.EXPIRED_REQUEST_TOKEN' },
  INVALID_USER_OTP: { httpStatus: 404, code: 112, message: 'ERROR.INVALID_USER_OTP' },
  AUTH_VALIDATION_ERROR: { httpStatus: 422, code: 114, message: 'ERROR.AUTH_VALIDATION_ERROR' },
  ITEM_NOT_FOUND: { httpStatus: 404, code: 203, message: 'ERROR.ITEM_NOT_FOUND' },
  ITEM_ALREADY_EXISTS: { httpStatus: 409, code: 204, message: 'ERROR.ITEM_ALREADY_EXISTS' },
  FIELD_INVALID: { httpStatus: 400, code: 205, message: 'ERROR.FIELD_INVALID' },
  UNKNOWN_ERROR: { httpStatus: 500, code: 400, message: 'ERROR.UNKNOWN_ERROR' },
  MAIL_ERROR: { httpStatus: 500, code: 500, message: 'ERROR.MAIL_ERROR' },
  STRIPE_ERROR: { httpStatus: 500, code: 501, message: 'ERROR.STRIPE_ERROR' },
  DOCUSIGN_ERROR: { httpStatus: 500, code: 505, message: 'ERROR.DOCUSIGN_ERROR' },
  FILE_NOT_EXISTS: { httpStatus: 400, code: 502, message: 'ERROR.FILE_NOT_EXISTS' },
  STRIPE_CARD_PAYMENT_ERROR: {
    httpStatus: 500,
    code: 503,
    message: 'ERROR.STRIPE_CARD_PAYMENT_ERROR'
  }
});

module.exports = {
  Status,
  Roles,
  NotificationTypes,
  ReviewTypes,
  QuestionTypes,
  ErrorCodes,
  StripeBankAccountHolderType,
  DeviceTypes,
  CreditCardTypes,
  UploadTypes,
  Ratings,
  JobTypes,
  Category,
  ScheduleTypes,
};
