export const Footer = () => {
    return (
        <footer
            className="py-4 px-4 mt-auto"
            style={{ backgroundColor: "#0f0f1a", borderTop: "2px solid #f8c100", color: "white" }}
        >
            <div className="container">
                <div className="row align-items-center">

                    {/* Brand */}
                    <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
                        <span className="fs-5 fw-bold text-warning"><i class="fa-solid fa-jedi fa-2xl"></i></span>
                        <p className="small text-white mb-0 mt-1">
                            A galaxy of data at your fingertips.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                        <p className="small text-white mb-1 fw-bold text-uppercase">Explore</p>
                        <div className="d-flex justify-content-center gap-3">
                            <a href="/#characters" className="text-warning text-decoration-none small">Characters</a>
                            <a href="/#planets" className="text-warning text-decoration-none small">Planets</a>
                            <a href="/#vehicles" className="text-warning text-decoration-none small">Vehicles</a>
                        </div>
                    </div>

                    {/* Credits */}
                    <div className="col-md-4 text-center text-md-end">
                       
                        <p className="small text-light mb-0">
                            © {new Date().getFullYear()} Star Wars Blog · Built by Erick de los Reyes
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    );
};
