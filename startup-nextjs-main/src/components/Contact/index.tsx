import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div style={{justifyContent:'space-evenly'}} className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'top', justifyContent: 'flex-start', height: '200px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px'}}>
              <img 
                src="images/meet-the-team/019.png" 
                alt="Example" 
                style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
              />
              <div style={{flexGrow: 1, textAlign: 'left', color: 'black'}}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop:'10px'}}>Quynh Do</h1>
                  <a href="https://www.linkedin.com/in/quynh-anh-nguyen-do/">linkedin</a>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'top', justifyContent: 'flex-start', height: '200px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px'}}>
              <img 
                src="images/meet-the-team/052.png" 
                alt="Example" 
                style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
              />
              <div style={{flexGrow: 1, textAlign: 'left', color: 'black'}}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop:'10px'}}>Sam Georges</h1>
                  <a href="https://www.linkedin.com/in/sam-georges-/">linkedin</a>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'top', justifyContent: 'flex-start', height: '200px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px'}}>
              <img 
                src="images/meet-the-team/190.png" 
                alt="Example" 
                style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
              />
              <div style={{flexGrow: 1, textAlign: 'left', color: 'black'}}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop:'10px'}}>Hector Anaya</h1>
                  <a href="https://www.linkedin.com/in/hector-anaya-37038520b/">linkedin</a>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'top', justifyContent: 'flex-start', height: '200px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px'}}>
              <img 
                src="images/meet-the-team/569.png" 
                alt="Example" 
                style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
              />
              <div style={{flexGrow: 1, textAlign: 'left', color: 'black'}}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop:'10px'}}>Kai Chan</h1>
                  <a href="https://www.linkedin.com/in/kai-z-chan/">linkedin</a>
              </div>
            </div>
            <div style={{display: 'flex', flexGrow: 1, alignItems: 'top', justifyContent: 'flex-start', height: '200px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px'}}>
              <img 
                src="images/meet-the-team/722.png" 
                alt="Example" 
                style={{ width: '200px', height: 'auto', marginRight: '20px' }} 
              />
              <div style={{flexGrow: 1, textAlign: 'left', color: 'black'}}>
                <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginTop:'10px'}}>Juan Cota</h1>
                  <a href="https://www.linkedin.com/in/juan-cota-176981241/">linkedin</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
