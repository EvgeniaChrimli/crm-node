import {
  createContact,
  getContactById,
  getContacts,
  updateContactById,
} from "./contacts.repository.js";
import {
  Contact,
  ContactsQueryDto,
  CreateContactBody,
  UpdateContactDto,
} from "./contacts.types.js";

export const fetchContacts = async ({
  limit,
  page,
  name,
  phone,
  company,
  position,
  order,
  sortBy,
}: ContactsQueryDto): Promise<Contact[]> => {
  return await getContacts({
    limit,
    page,
    name,
    phone,
    company,
    position,
    order,
    sortBy,
  });
};

export const createContactService = async ({
  name,
  company,
  position,
  phone,
}: CreateContactBody): Promise<Contact> => {
  return createContact({ name, company, position, phone });
};

export const getContactByIdService = async (id: number) => {
  return getContactById(id);
};

export const updateContactByIdService = async (
  id: number,
  data: UpdateContactDto,
) => {
  return updateContactById(id, data);
};
