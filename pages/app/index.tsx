import {NextPage} from "next";
import MainLayout from "../../src/components/layout/MainLayout";
import {withPageAuthRequired} from "@auth0/nextjs-auth0";

const AppIndex: NextPage = () => {

    return (
        <>
            <MainLayout>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, assumenda commodi delectus,
                distinctio doloremque dolores ea ex explicabo id ipsa iste itaque laudantium molestiae nam
                necessitatibus nihil nisi odio omnis quae qui ratione repellat reprehenderit repudiandae sequi sint
                soluta suscipit tenetur totam voluptatibus. Ad aperiam architecto asperiores aspernatur, blanditiis
                corporis deserunt distinctio dolor dolores earum eligendi error esse est ex excepturi expedita facilis
                hic impedit incidunt ipsa ipsam ipsum itaque maxime, minima molestias nesciunt nihil nisi nulla optio
                perspiciatis praesentium quaerat quas similique sint soluta ullam voluptates. Accusantium architecto
                consequatur delectus dolore dolorum ducimus eius eum excepturi facere, in nulla perferendis provident
                quaerat quam quidem quos rerum sint sunt tempore voluptatibus! Alias blanditiis corporis delectus dicta
                dolore dolorem doloribus dolorum eos, et exercitationem incidunt, ipsa laboriosam laborum maxime modi
                nam numquam omnis perferendis porro praesentium provident quas quibusdam ratione recusandae repellendus
                temporibus ut voluptatum. Amet culpa deleniti ea, eaque expedita fuga iusto magni minus mollitia
                praesentium saepe sapiente soluta? Consectetur cupiditate fuga nostrum repellendus veritatis voluptate.
            </MainLayout>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired();

export default AppIndex