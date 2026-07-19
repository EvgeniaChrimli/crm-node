import { ApiError } from "../../errors/api.error.js";
import {
  createAccess,
  deleteAccessById,
  getContactsByUserId,
  getUsersByContactId,
} from "./access.repository.js";
import { CreateAccess } from "./access.types.js";

export const addAccess = async ({ user_id, contact_id }: CreateAccess) => {
  return createAccess({ contact_id, user_id });
};

export const deleteAccess = async ({ user_id, contact_id }: CreateAccess) => {
  const deleted = await deleteAccessById(contact_id, user_id);

  if (!deleted) {
    throw new ApiError(404, "Access not found");
  }
};

export const getContactsByUserIdService = async (id: number) => {
  return getContactsByUserId(id);
};

export const getUsersByContactIdService = async (id: number) => {
  return getUsersByContactId(id);
};
