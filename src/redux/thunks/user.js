import { getUser } from "../../api/auth";
import { handleRefreshUser, handleResetUser } from "../authentication";
export const attemptGetUser = () => async (dispatch) =>
  await getUser()
    .then((res) => {
      if (res.data.user) {
        dispatch(handleRefreshUser({ ...res.data.user }));
      } else {
        dispatch(handleResetUser({}));
      }
    })
    .catch(() => {
      dispatch(handleResetUser({}));
    });
