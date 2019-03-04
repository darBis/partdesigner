class MeshRenderer {
    shader: Shader;

    positions: WebGLBuffer;
    normals: WebGLBuffer;

    mesh: Mesh;

    constructor() {
        this.shader = new Shader(gl, VERTEX_SHADER, FRAGMENT_SHADER);

        this.shader.setAttribute(gl, "vertexPosition");
        this.shader.setAttribute(gl, "normal");
        this.shader.setUniform(gl, "projectionMatrix");
        this.shader.setUniform(gl, "modelViewMatrix");
    }

    public setMesh(mesh: Mesh) {
        this.mesh = mesh;
        this.positions = mesh.createPositionBuffer();
        this.normals = mesh.createNormalBuffer();
    }

    public render(camera: Camera) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positions);
        gl.vertexAttribPointer(this.shader.attributes["vertexPosition"], 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attributes["vertexPosition"]);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normals);
        gl.vertexAttribPointer(this.shader.attributes["normal"], 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.shader.attributes["normal"]);
      
        gl.useProgram(this.shader.program);
      
        gl.uniformMatrix4fv(this.shader.attributes["projectionMatrix"], false, camera.getProjectionMatrix().elements);
        gl.uniformMatrix4fv(this.shader.attributes["modelViewMatrix"], false, Matrix4.getTranslation(new Vector3(0, 0, -10)).elements);
      
        gl.drawArrays(gl.TRIANGLES, 0, this.mesh.triangles.length);
    }
}