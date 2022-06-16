import {NextPage} from 'next';
import {MainLayout, Button, LinkButton} from '~/components/index';
import Link from 'next/link';
import {BsSearch} from 'react-icons/bs';
import {MouseEvent} from 'react'

const Home: NextPage = () => {
  return (
    // <MainLayout titlePage='Trang Chủ'>
      
    // </MainLayout>
    // <Link href='http://localhost:3002/checkout' passHref>
    //   <a>
    //     <BsSearch/>
    //     click
    //   </a>
    // </Link>
    <>
    <Button variant='secondary-border' size='lg'>
      Log in
    </Button>
    <Button size='sm'>
      search
    </Button>
    <LinkButton leftIcon={<BsSearch/>} href='facebook.com' disable>
      search
    </LinkButton>

    </>
  )
}

export default Home;
