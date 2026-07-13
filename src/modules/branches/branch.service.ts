import {
  createBranch,
  getBranchById,
  getBranches,
  updateBranchById,
} from "./branch.repository.js";
import {
  Branch,
  BranchesQueryDto,
  CreateBranchBody,
  UpdateBranchDto,
} from "./branch.types.js";

export const fetchBranches = async ({
  limit,
  page,
  name,
  phone,
  order,
  sortBy,
}: BranchesQueryDto): Promise<Branch[]> => {
  return await getBranches({ limit, page, name, phone, order, sortBy });
};

export const createBranchService = async ({
  phone,
  name,
}: CreateBranchBody): Promise<Branch> => {
  return createBranch({ name, phone });
};

export const getBranchByIdService = async (id: number) => {
  return getBranchById(id);
};

export const updateBranchByIdService = async (
  id: number,
  data: UpdateBranchDto,
) => {
  return updateBranchById(id, data);
};
