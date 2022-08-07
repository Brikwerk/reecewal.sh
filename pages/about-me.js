import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import Content from '../components/content'
import Section from '../components/section'
import { Email, GitHub, LinkedIn } from '@mui/icons-material'
import Experience from '../components/experience'
import Project from '../components/project'
import Degree from '../components/degree'
import Award from '../components/award'

export default function Home() {
    let title = "About Me"
    return (
        <Layout title={title}>
            <Content title={title}>
                <p>
                    {`Hey, I'm Reece! 👋`}
                </p>
                <p>
                    {`I'm a graduate student currently studying at the 
                    University of British Columbia (UBC). My interests 
                    and research lie in teaching computers about the real 
                    world through images and video. Currently, I'm 
                    focusing on training a computer to understand something 
                    from very few examples, AKA few-shot learning. In my 
                    spare time, I also like tinkering with Linux systems, 
                    dabbling in task automation, and exploring web 
                    technologies.`}
                </p>
                <p>
                    {`On this page you can find out a bit more about me, some 
                    of my past projects (mostly open source), and my other 
                    interests.`}
                </p>

                <Section title='Connect' accordion={true} accordionHidden={false}>
                    <span className='pb-3 font-body flex items-center'>
                        <span className='pr-2'><Email/></span>
                        {`Email: mail "at" reecewal.sh`}
                    </span>
                    <span className='pb-3 font-body flex items-center'>
                        <span className='pr-2'><LinkedIn/></span>
                        <Link href="https://www.linkedin.com/in/reece-walsh-742893221/">
                            <a>LinkedIn: <span className='underline'>Reece Walsh</span></a>
                        </Link>
                    </span>
                    <span className='pb-3 font-body flex items-center'>
                        <span className='pr-2'><GitHub/></span>
                        <Link href="https://github.com/Brikwerk">
                            <a>GitHub: <span className='underline'>Brikwerk</span></a>
                        </Link>
                    </span>
                </Section>
                <Section title='Education & Awards' accordion={true}>
                    <div className='md:grid md:grid-cols-2 md:gap-6'>
                        <Degree
                            title="Bachelor of Science with Honours"
                            specialization="Major in Computer Science"
                            institution="UBC"
                            received="Received June 2020"
                        />
                        <Degree
                            title="Master of Science"
                            specialization="Specialization in Computer Science"
                            institution="UBC"
                            received="Estimated completion in Oct 2022"
                        />
                    </div>
                    <Award
                        title="University Graduate Fellowship"
                        received="2021-2022"
                        organization="UBC"
                    >
                        {`University Graduate Fellowships (UGF) are awarded to 
                        current graduate students at UBC who demonstrate competence 
                        in their program, and are registered in a full-time thesis 
                        based program at UBC. To be eligible for the UGF, 
                        students must submit an annual progress report to the College 
                        of Graduate Studies by June 1, and be nominated by the graduate 
                        program in which they are registered.`}
                    </Award>
                    <Award
                        title="UBC Graduate Dean's Entrance Scholarship"
                        received="Sep 2020"
                        organization="UBC"
                    >
                        {`Graduate Dean’s Entrance Scholarships (GDES) are based 
                        on merit and offered to incoming full-time thesis-based 
                        master’s and doctoral students at UBC. Eligible students 
                        must have an admission GPA of first-class standing.`}
                    </Award>
                    <Award
                        title="Deputy Vice-Chancellor Scholarship for Continuing Students"
                        received="2019-2020"
                        organization="UBC"
                    >
                        Granted to students who obtained an average of 90% or higher.
                    </Award>
                    <Award
                        title="UBC Interdisciplinary Health Conference Top Honours"
                        received="Nov 2019"
                        organization="The UBC Interdisciplinary Health Conference"
                    >
                        An award granted to the top poster within its category at the 
                        UBC Interdisciplinary Health Conference
                    </Award>
                </Section>
                <Section title='Work Experience' accordion={true}>
                    <Experience
                        title='Graduate Research and Teaching Assistant'
                        employer='UBC'
                        timeline='2020/09 - Present'
                        location='Remote, Kelowna'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                Engaged in teaching a variety of Computer Science labs 
                                and tutorials throughout my graduate degree. Courses I 
                                taught in include Capstone, Databases, and Parallel 
                                Computing.
                            </li>
                            <li>
                                Applied machine learning techniques during my graduate 
                                research on topics involving image classification and 
                                few-shot learning.
                            </li>
                        </ul>
                    </Experience>
                    <Experience
                        title='System Architect, Contractor'
                        employer='UBC'
                        timeline='2021/05 - 2021/07'
                        location='Remote'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                Designed AutoEd, a system that enabled the creation, 
                                submittance, and autograding of student-made ER diagrams.
                            </li>
                            <li>
                                {`Directed a team of 3 other programmers in the task of 
                                building AutoEd’s core functionality.`}
                            </li>
                            <li>
                                Configured a continuous deployment pipeline for the system 
                                using a self-hosted instance of GoCD and a Red Hat Linux VM.
                            </li>
                            <li>
                                Leveraged knowledge in Docker, Traefik, JavaScript, and 
                                Python to successfully build AutoEd.
                            </li>
                        </ul>
                    </Experience>
                    <Experience
                        title='Machine Learning Researcher, Intern'
                        employer='Smart Labs Ltd., UBC'
                        timeline='2020/09 - 2020/12'
                        location='Remote'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                Implemented, trained and tested 9 state-of-the-art few-shot 
                                learning techniques, 4 network backbones, and 3 model additions 
                                for human cell classification.
                            </li>
                            <li>
                                Increased human cell classification accuracy by 2% and 
                                framerate by 10x over state-of-the-art techniques.
                            </li>
                            <li>
                                Funding for this position was won through a MITACS Accelerate 
                                grant, jointly proposed by myself, Dr. Mohamed Shehata (UBC), 
                                and Dr. Mostafa Mohamed (Smart Labs Ltd.).
                            </li>
                        </ul>
                    </Experience>
                    <Experience
                        title='UBC Research Student'
                        employer='UBC'
                        timeline='2019/09 - 2020/08'
                        location='Remote'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                Designed, programmed, and tested a novel data pipeline and 
                                algorithm for identifying sources of low-dose X-ray scatter.
                            </li>
                            <li>
                                Collaborated with multidisciplinary team members to design 
                                and fabricate a camera capable of capturing low-dose 
                                X-ray data.
                            </li>
                            <li>
                                Selected from a pool of over 300 other students to participate 
                                in a multidisciplinary undergraduate research project.
                            </li>
                            <li>
                                Won “Top Poster” at the UBC Interdisciplinary Health Conference.
                            </li>
                            <li>
                                Earned further summer funding as a result of research success.
                            </li>
                        </ul>
                    </Experience>
                    <Experience
                        title='Summer Research Student'
                        employer='Interior Health'
                        timeline='2017/04 - 2019/08'
                        location='Kelowna'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                {`Engaged in quality assurance/control-based software design 
                                and research for imaging departments within BC’s Interior 
                                Health Authority.`}
                            </li>
                            <li>
                                Researched and deployed a system capable of detecting CT 
                                machine specification drift two weeks ahead of a human 
                                technologist. This research resulted in an oral presentation 
                                at the Canadian Organization of Medical Physics Conference.
                            </li>
                            <li>
                                Designed and deployed an application for tracking X-ray 
                                machine errors and identifying outliers across the 
                                interior of BC.
                            </li>
                        </ul>
                    </Experience>
                    <Experience
                        title='Web Developer, Contractor'
                        employer='Various'
                        timeline='2017/09 - Present'
                        location='British Columbia'
                    >
                        <ul className='list-disc ml-6'>
                            <li>
                                Designed, programmed, and deployed websites for various 
                                clients on a contractual basis. Services rendered also 
                                included hosting, email, and domain management. Projects 
                                ranged from professional athlete showcases to online art 
                                exhibit accompaniments.
                            </li>
                        </ul>
                    </Experience>
                </Section>
                <Section title='Projects' accordion={true}>
                    <Project
                        title="NXBT"
                        projectLink="https://github.com/brikwerk/nxbt"
                        imageSrc="/images/nxbt.jpg"
                        imageAlt="NXBT Logo"
                    >
                        <div>
                            Control your Nintendo Switch through a website, terminal, or macro.
                        </div>
                        <div>
                            Utilizes: Python, JavaScript, HTML/CSS, Vagrant
                        </div>
                    </Project>
                    <Project
                        title="BDSP Automation"
                        projectLink="https://github.com/Brikwerk/bdsp-automation"
                        imageSrc="/images/bdsp_automation.jpg"
                        imageAlt="An image from BDSP during automation"
                    >
                        <div>
                            Automation scripts for shiny hunting in Pokemon Brilliant Diamond and 
                            Shining Pearl.
                        </div>
                        <div>
                            Utilizes: Python, JavaScript, HTML/CSS, Video Streaming
                        </div>
                    </Project>
                    <Project
                        title="Autumn Strawberry"
                        projectLink="https://autumnstrawberry.com"
                        imageSrc="/images/autumn_strawberry.jpg"
                        imageAlt="A piece of artwork from the Autumn Strawberry exhibit"
                    >
                        <div>
                            {`An accompaniment website for Cindy Mochizuki's Autumn 
                            Strawberry art exhibit at the Surrey Art Gallery.`}
                        </div>
                        <div>
                            Utilizes: JavaScript, HTML/CSS, WebGL Shaders
                        </div>
                    </Project>
                    <Project
                        title="Fourier Transform Deconvolution"
                        projectLink="https://github.com/Brikwerk/fourier-transform-deconvolution"
                        imageSrc="/images/fourier_deconv.jpg"
                        imageAlt="Deconvolved X-ray Scatter"
                    >
                        <div>
                            Deconvolve images with the Fourier Transform, given a kernel image 
                            and a convolved image.
                        </div>
                        <div>
                            Utilizes: Python
                        </div>
                    </Project>
                    <Project
                        title="CTQA"
                        projectLink="https://github.com/Brikwerk/ctqa"
                        imageSrc="/images/ctqa.jpg"
                        imageAlt="CTQA logo"
                    >
                        <div>
                            An application for automated CT quality assurance.
                        </div>
                        <div>
                            Utilizes: Python
                        </div>
                    </Project>
                    <Project
                        title="Whiteboard Vision"
                        projectLink="https://github.com/Brikwerk/whiteboard-vision"
                        imageSrc="/images/whiteboard_vision.jpg"
                        imageAlt="Identified text using Whiteboard Vision"
                    >
                        <div>
                            A project that aims to detect and transcribe text written on a 
                            whiteboard in a classroom environment.
                        </div>
                        <div>
                            Utilizes: JavaScript, HTML/CSS, Python, Docker
                        </div>
                    </Project>
                    <Project
                        title="TagCite"
                        projectLink="https://github.com/Brikwerk/tagcite"
                        imageSrc="/images/tagcite.jpg"
                        imageAlt="TagCite logo"
                    >
                        <div>
                            A utility that aids in the organization of papers and citations 
                            through use of tagging, titling, and tag clouds.
                        </div>
                        <div>
                            Utilizes: JavaScript, HTML/CSS, Webpack, npm
                        </div>
                    </Project>
                </Section>
                <Section title='Hardware & Software' accordion={true}>
                    <div className='sm:flex sm:justify-center'>
                        <div className='flex justify-center pb-4 sm:pr-6'>
                            <div className='w-48'>
                                <Image
                                    src="/images/server.png"
                                    alt="An image of a black desktop"
                                    height={230}
                                    width={231}
                                />
                            </div>
                        </div>
                        <div className='font-body'>
                            Linux Server (pictured, self-built):
                            <ul className='list-disc list-inside'>
                                <li>
                                    OS: Pop!_OS
                                </li>
                                <li>
                                    CPU: AMD Threadripper 3970x
                                </li>
                                <li>
                                    GPUs: NVIDIA RTX 3090 x2
                                </li>
                            </ul>
                            Gaming PC (self-built):
                            <ul className='list-disc list-inside'>
                                <li>
                                    OS: Windows 10
                                </li>
                                <li>
                                    CPU: Intel i7 7700
                                </li>
                                <li>
                                    GPUs: AMD Vega 64
                                </li>
                            </ul>
                            <br/>
                            <div>
                                Editor: Visual Studio Code
                            </div>
                            <div>
                                Terminal: iTerm2
                            </div>
                        </div>
                    </div>
                </Section>
                <Section title='Hobbies' accordion={true}>
                    <div className='pb-6'>
                        <Image
                            src="/images/hobbies.png"
                            alt="Images from biking, skiing, and hiking"
                            height={1116}
                            width={2446}
                        />
                    </div>
                    <p>
                        Outside of computer-related activities, my favourite 
                        hobbies mainly involve the outdoors! Backcountry 
                        camping, skiing, and trail cycling are among some of 
                        the ways I most enjoy spending my time. You can see a 
                        few photos from my adventures above.
                    </p>
                    <p>
                        During quieter hours, I also like to draw and create 
                        short animations. Some of my recent animated work was 
                        accepted into the Annual Student Okanagan Film Festival.
                    </p>
                </Section>
            </Content>
        </Layout>
    )
}