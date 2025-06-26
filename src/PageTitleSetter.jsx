import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleSetter = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        let title = "LMS | Dashboard"; // default

        if (path === "/lmsinstitutejune5/") {
            title = "LMS | Home";
        } else if (path.startsWith("/lmsinstitutejune5/maindashboard/sheduled")) {
            title = "LMS | Scheduled Tests";
        } else if (path.includes("/current-running-test-details/")) {
            title = "LMS | Running Test Details";
        } else if (path.includes("/upcoming-test-details/")) {
            title = "LMS | Upcoming Test Details";
        } else if (path.includes("/completed-test-details/")) {
            title = "LMS | Completed Test Details";
        } else if (path.startsWith("/lmsinstitutejune5/maindashboard/unscheduled")) {
            title = "LMS | Unscheduled Tests";
        } else if (path.includes("/unscheduledtest-details/")) {
            title = "LMS | Unscheduled Test Details";
        } else if (path === "/lmsinstitutejune5/maindashboard/subscription") {
            title = "LMS | Subscription";
        } else if (path.includes("/Teachers")) {
            title = "LMS | Teachers";
        }

        document.title = title;
    }, [location.pathname]);

    return null; // since this just sets title, it renders nothing
};
export default PageTitleSetter