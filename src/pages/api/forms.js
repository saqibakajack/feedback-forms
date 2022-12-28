import handler from "@/lib/next-connect";
import { getForms, submitForm } from "@/controllers/form.controller";
import isAuth from "@/middlewares/is-auth.middleware";

const router = handler();

router.use(isAuth).get(getForms);
router.use(isAuth).post(submitForm);

export default router;
