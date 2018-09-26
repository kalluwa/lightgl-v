//quaternion.js by kalluwa
//9/26/2018

function Quaternion(x,y,z,w)
{
    this.x = x||0;
    this.y = y||0;
    this.z = z||0;
    this.w = w||1.0;
}

Quaternion.prototype = 
{
    //define all member function here
    
    //! equal
    equals : function(v)
    {
        return this.x == v.x && this.y == v.y &&
            this.z = v.z && this.w == v.w;
    },
    
    //set
    set:function(x,y,z,w)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    },
    
    //normalize itself
    normalize : function()
    {
        var n = this.x * this.x + this.y* this.y+
            this.z*this.z + this.w*this.w;
           
        if(n == 1) return new Quaternion(this.x,this.y,this.z,this.w);
        
        n = 1.0/n;
        this.x *= n;
        this.y *= n;
        this.z *= n;
        this.w *= n;
        
        return new Quaternion(this.x,this.y,this.z,this.w);;
    },
    //matrix2quaternion
    fromMatrix:function(mat)
    {
        var m = mat.m;
        
        var diag = m[0] + m[5] + m[10] + 1;
        var scale = 0.0f;

        if( diag > 0.0f )
        {
            scale = sqrtf(diag) * 2.0f; // get scale from diagonal

            // TODO: speed this up
            this.x = ( m[9] - m[6]) / scale;
            this.y = ( m[2] - m[8]) / scale;
            this.z = ( m[4] - m[1]) / scale;
            this.w = 0.25f * scale;
        }
        else
        {
            if ( m(0,0) > m(1,1) && m(0,0) > m(2,2))
            {
                // 1st element of diag is greatest value
                // find scale according to 1st element, and double it
                scale = sqrtf( 1.0f + m(0,0) - m(1,1) - m(2,2)) * 2.0f;

                // TODO: speed this up
                this.x = 0.25f * scale;
                this.y = (m[1] + m[4]) / scale;
                this.z = (m[8] + m[2]) / scale;
                this.w = (m[9] - m[6]) / scale;
            }
            else if ( m(1,1) > m(2,2))
            {
                // 2nd element of diag is greatest value
                // find scale according to 2nd element, and double it
                scale = sqrtf( 1.0f + m[5] - m[0]- m[10]) * 2.0f;

                // TODO: speed this up
                this.x = (m[1] + m[4] ) / scale;
                this.y = 0.25f * scale;
                this.z = (m[1,2) + m(2,1) ) / scale;
                this.w = (m(0,2) - m(2,0) ) / scale;
            }
            else
            {
                // 3rd element of diag is greatest value
                // find scale according to 3rd element, and double it
                scale  = sqrtf( 1.0f + m[10] - m[0] - m[5]) * 2.0f;

                // TODO: speed this up
                this.x = (m[10] + m[8]) / scale;
                this.y = (m[6] + m[9]) / scale;
                this.z = 0.25f * scale;
                this.w = (m[4] - m[1]) / scale;
            }
        }

        normalize();
    },
    
    toMatrix:function()
    {
        var dest = new Matrix();
        
        dest.m[0] = 1.0f - 2.0f*this.y*this.y - 2.0f*this.z*this.z;
        dest.m[1] = 2.0f*this.x*this.y + 2.0f*this.z*this.w;
        dest.m[2] = 2.0f*this.x*this.z - 2.0f*this.y*this.w;
        dest.m[3] = 0.0f;

        dest.m[4] = 2.0f*this.x*this.y - 2.0f*this.z*this.w;
        dest.m[5] = 1.0f - 2.0f*this.x*this.x - 2.0f*this.z*this.z;
        dest.m[6] = 2.0f*this.z*this.y + 2.0f*this.x*this.w;
        dest.m[7] = 0.0f;

        dest.m[8] = 2.0f*this.x*this.z + 2.0f*this.y*this.w;
        dest.m[9] = 2.0f*this.z*this.y - 2.0f*this.x*this.w;
        dest.m[10] = 1.0f - 2.0f*this.x*this.x - 2.0f*this.y*this.y;
        dest.m[11] = 0.0f;

        dest.m[12] = 0.f;
        dest.m[13] = 0.f;
        dest.m[14] = 0.f;
        dest.m[15] = 1.f;
        
        return dest;
    },
    
    makeInverse:function()
    {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    },
    
    //dot quaternion
    getDotProduct:function(q2)
    {
        return (x * q2.x) + (y * q2.y) + (z * q2.z) + (w * q2.w);
    },
    
    //make copy
    clone:function()
    {
        return new Quaternion(this.x,this.y,this.z,this.w);
    },
    
    slerp:function(q1,q2,time)
    {
        var angle = q1.getDotProduct(q2);
        
        var q2Clone = q2.clone();
        
        if (angle < 0.0f)
        {
            q1 = q1.multiply(-1.0f);
            angle *= -1.0f;
        }

        var scale;
        var invscale;

        if ((angle + 1.0f) > 0.05f)
        {
            if ((1.0f - angle) >= 0.05f)  // spherical interpolation
            {
                var theta = Math.acos(angle);
                var invsintheta = 1.0f / Math.sin(theta);
                scale = Math.sin(theta * (1.0f-time)) * invsintheta;
                invscale = Math.sin(theta * time) * invsintheta;
            }
            else // linear interploation
            {
                scale = 1.0f - time;
                invscale = time;
            }
        }
        else
        {
            q2Clone = new Quaternion(-q1.y, q1.x, -q1.w, q1.z);
            scale = Math.sin(PI * (0.5f - time));
            invscale = Math.sin(Math.PI * time);
        }

        this.set(q1.multiply(scale).add(q2Clone.multiply(invscale)));
    },
    
    //create quaternion from angle[float] and axis[Vector3]
    fromAxisAngle:function(angle,axis)
    {
        var fHalfAngle = 0.5f*angle;
        var fSin = Math.sin(fHalfAngle);
        w = Math.cos(fHalfAngle);
        x = fSin*axis.x;
        y = fSin*axis.y;
        z = fSin*axis.z;
    },
    
    //make quaterion 1
    makeIdentity:function()
    {
        this.x = 0.0f;
        this.y = 0.0f;
        this.z = 0.0f;
        this.w = 1.0f;
    },
    
    multiply:function(v)
    {
        var re = new Quaternion();
        
        if(v instanceof Quaternion)
        {
            re.w = (v.w * w) - (v.x * x) - (v.y * y) - (v.z * z);
            re.x = (v.w * x) + (v.x * w) + (v.y * z) - (v.z * y);
            re.y = (v.w * y) + (v.y * w) + (v.z * x) - (v.x * z);
            re.z = (v.w * z) + (v.z * w) + (v.x * y) - (v.y * x);
        }
        else
        {
            //float
            re.x = this.x * v;
            re.y = this.y * v ;
            re.z = this.z * v;
            re.w = this.w * v;
        }
        return re;
    },
    add : function(v)
    {
        var re = this.clone();
        if(v instanceof quaternion)
        {
            re.x += v.x;
            re.y += v.y;
            re.z += v.z;
            re.w += v.w;
        }
        else
        {
            re.x += v;
            re.y += v;
            re.z += v;
            re.w += v;
        }
        
        return re;
    },
}