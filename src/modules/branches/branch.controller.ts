import { Request, Response } from "express";
import {
  BranchesQueryDto,
  CreateBranchBody,
  UpdateBranchDto,
} from "./branch.types.js";
import {
  createBranchService,
  fetchBranches,
  getBranchByIdService,
  updateBranchByIdService,
} from "./branch.service.js";
import { IdDto } from "../../shared/types/common-types.js";
import { errorMessages } from "../../shared/constants/errors.js";

export const getBranchesController = async (
  req: Request<{}, {}>,
  res: Response,
) => {
  const { limit, page, name, phone, order, sortBy } = req.validated
    ?.query as BranchesQueryDto;

  const branches = await fetchBranches({
    limit,
    page,
    name,
    phone,
    order,
    sortBy,
  });
  return res.json(branches);
};

export const createBranchController = async (
  req: Request<{}, {}, CreateBranchBody>,
  res: Response,
) => {
  const { name, phone } = req.validated?.body as CreateBranchBody;

  const branch = await createBranchService({ name, phone });
  return res.status(201).json(branch);
};

export const getBranchByIdController = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const branch = await getBranchByIdService(id);

  if (!branch) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(branch);
};

export const updateBranchByIdController = async (
  req: Request<{ id: string }, {}, UpdateBranchDto>,
  res: Response,
) => {
  const { id } = req.validated?.params as IdDto;
  const data = req.validated?.body as UpdateBranchDto;

  const branch = await updateBranchByIdService(id, data);

  if (!branch) {
    return res.status(404).json({ message: errorMessages.not_found });
  }

  return res.status(200).json(branch);
};
